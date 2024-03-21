import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type formValues = {
  username: string;
  email: string;
  channel: string;
};

const DemoForm = () => {
  const form = useForm<formValues>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: formValues) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: { value: true, message: 'Username is required!' },
            })}
          />
          <p className="error">{errors?.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email format',
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@email.com' ||
                    'enter a different email address.'
                  );
                },
                blockListedDomain: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('baddomain.com') ||
                    'enter a different domain.'
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel')} />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default DemoForm;
