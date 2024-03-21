import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type formValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: { number: string }[];
  age: number;
  dob: Date;
};

const DemoForm = () => {
  const form = useForm<formValues>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      social: { facebook: '', twitter: '' },
      phoneNumbers: [{ number: '' }],
      age: 0,
      dob: new Date(),
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields, },
  } = form;

  console.log();

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control,
  });

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
              required: { value: true, message: 'Email is required' },
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
          <input
            type="text"
            id="channel"
            {...register('channel', {
              required: { value: true, message: 'channel is required!' },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register('social.facebook')} />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input type="text" id="twitter" {...register('social.twitter')} />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Numbers List</label>
          <div>
            {fields.map((field, index) => (
              <div className="form-control" key={field.id}>
                <input
                  placeholder={`phone number ${index + 1}`}
                  type="text"
                  id="phoneNumber"
                  {...register(`phoneNumbers.${index}.number`)}
                />
                {index > 0 && (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            <button
              className="btn"
              type="button"
              onClick={() => append({ number: '' })}
            >
              Add
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register('age', {
              valueAsNumber: true,
              required: { value: true, message: 'Age is required!' },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register('dob', {
              valueAsDate: true,
              required: { value: true, message: 'Date of birth is required!' },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <button className="btn">submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default DemoForm;
