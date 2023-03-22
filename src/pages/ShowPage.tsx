import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '@contexts/store.context';

import API_URL from '@utils/api/url';
import { INasaAsset } from '@utils/api/api.types';

const ShowPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<INasaAsset | null>(null);
  const [loading, setLoading] = useState(false);

  const { state } = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<INasaAsset>(`${API_URL}/asset/${id}`);
        console.log({ response });
        const { data } = response;
        setData(data);
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const localDate = new Date(
    state.currentCollection?.data[0].date_created as string,
  ).toLocaleDateString();

  return (
    <div className="px-8 lg:px-80">
      <Link to="/" className="text-xl font-semibold hover:text-slate-300">
        ⬅️ Back To Home
      </Link>
      <h1 className="my-8 text-4xl font-extrabold">{state.currentCollection?.data[0].title}</h1>

      <div className=" grid grid-cols-3 gap-4 text-slate-200">
        <h4 className="text-xl font-semibold">📅 {localDate}</h4>
        {state.currentCollection?.data[0].photographer && (
          <h4 className="text-xl font-semibold ">
            📸 {state.currentCollection?.data[0].photographer}
          </h4>
        )}
        {state.currentCollection?.data[0].location && (
          <h4 className="text-lg font-semibold">🗺️ {state.currentCollection?.data[0].location}</h4>
        )}
      </div>

      {/* !!INSTRUCTION WAS NOT CLEAR WHETHER TO SHOW COLLECTION OF IMAGES, all images were the same except the json data and tif format */}
      {/* <div className="grid w-full grid-cols-3 gap-4">
        {data?.collection.items.map((item) => (
          <div className="my-8 h-[20vh]">
            <img src={item.href} className="h-full w-full" />
          </div>
        ))}
      </div> */}
      <div className="my-8 h-[40vh]">
        {loading ? (
          'loading'
        ) : (
          <img src={data?.collection.items[1].href} className="h-full w-full" />
        )}
      </div>

      <p className="text-xl">{state.currentCollection?.data[0].description_508}</p>
      {state.currentCollection?.data[0].keywords.map((keyword, i) => (
        <small key={i} className="ml-4 text-sm text-slate-500">
          {keyword}
        </small>
      ))}
    </div>
  );
};

export default ShowPage;
