import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Banner } from "src/model/information/Banner";
import { Service } from "src/model/information/Services";
import { getBanner, getServices } from "src/service/ModuleIInformationf";
import Information from "src/shared/Information";
import { setService } from "src/store/serviceSlice";
import { RootState } from "src/store/store";

const HomePage = () => {
  const paymenMode = useSelector((state: RootState) => state.service);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [banner, setBanner] = useState<Array<Banner>>([]);
  const [serviceData, setServiceData] = useState<Array<Service>>([]);

  const onClick = (item: Service) => {
    dispatch(setService(item));
    navigate("/payment");
  };

  const getDataBanner = () => {
    getBanner().then((res) => {
      if (res.data.status == 0) {
        setBanner(res.data.data);
      }
    });
  };

  const getdataService = () => {
    getServices().then((res) => {
      if (res.data.status == 0) {
        setServiceData(res.data.data);
      }
    });
  };

  useEffect(() => {
    console.log(paymenMode);
  }, [paymenMode]);

  useEffect(() => {
    getdataService();
    getDataBanner();
  }, []);

  return (
    <div className="container mx-auto pt-12">
      <Information />
      <div className="mt-4 pt-4">
        <div className="flex gap-2 overflow-x-auto">
          {serviceData.map((item, index) => (
            <Link
              to="/payment"
              className="text-center cursor-pointer"
              key={index}
              onClick={() => onClick(item)}
            >
              <div className={`rounded-lg flex justify-center`}>
                <img
                  src={item.service_icon}
                  className="w-16 h-16 border-red-400"
                />
              </div>
              <div className="pt-2 text-xs">{item.service_name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="relative h-full">
          <div className="font-semibold">Temukan promo menarik</div>
          <div className="pt-4 flex h-full gap-4 overflow-x-auto">
            {banner.map((item, index) => (
              <img src={item.banner_image} className="" key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
