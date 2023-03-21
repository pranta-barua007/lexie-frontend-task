import { useState } from 'react';

import axios from 'axios';

import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import RHFormInput from '@components/RHF-Input';
import Button from '@ui/Button';
import Card from '@components/Card';

const currentYear = new Date().getFullYear();

const validationSchema = z
  .object({
    query: z.string().min(4, { message: 'Must be 4 characters long!' }),
    startYear: z.string().max(4, { message: 'Year must be 4 characters' }).default('2011'),
    endYear: z.string().max(4, { message: 'Year must be 4 characters' }).default(`${currentYear}`),
  })
  .refine((data) => Number(data.startYear) < Number(data.endYear), {
    path: ['startYear'],
    message: 'Must be less then End Year',
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const { reset, handleSubmit } = methods;
  interface Result {
    data: {
      nasa_id: string;
      title: string;
      location: string;
      photographer: string;
    }[];
    links: {
      href: string;
    }[];
  }

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.get('https://images-api.nasa.gov/search', {
        params: {
          q: data.query,
          media_type: 'image',
          year_start: data.startYear,
          year_end: data.endYear,
        },
      });
      setResults(response.data.collection.items);
    } catch (error) {
      console.error(error);
      reset({
        query: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12">
      <div className="mb-16 flex w-full flex-col items-center justify-center">
        <div className="mb-16 ">
          <h1 className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            NASA
            <span className="animate-bounce">🛸</span>
            Media Library
          </h1>
          <small className="text-center text-3xl font-semibold text-slate-200">
            Sharing the moments of joy
          </small>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 grid gap-8 text-lg sm:grid-cols-1 md:grid-cols-3 lg:gap-4">
              <RHFormInput name="query" label="🔍 Search" type="text" className="col-span-2" />
              <RHFormInput
                name="startYear"
                label="📅 Starting Year"
                type="number"
                min={'2011'}
                max={`${Number(methods.getValues().endYear) - 1}`}
              />
              <RHFormInput
                name="endYear"
                label="📆 Ending Year"
                type="number"
                min={`${Number(methods.getValues().startYear) + 1}`}
                max={currentYear}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button label="Submit" type="submit" fullWidth loading={loading} />
            </div>
          </form>
        </FormProvider>
      </div>

      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result: Result) => (
          <Card
            key={result.data[0].nasa_id}
            img={result.links[0].href}
            title={result.data[0].title}
            photographer={result.data[0].photographer}
            location={result.data[0].location}
            link={result.data[0].nasa_id}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
