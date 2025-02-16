import { useEffect, useState } from "react";
import {
  Record,
  TransactionHistory,
} from "src/model/transaction/TransactionHistory";
import { getTransactionHIstory } from "src/service/ModuleTransaction";
import Button from "src/shared/button/Button";
import Information from "src/shared/Information";
import { DateTime } from "luxon";

const TransactionPage = () => {
  // const [selected, setSelected] = useState("");
  const [transaction, setTransaction] = useState<Array<Record>>([]);
  const [input, setInput] = useState<TransactionHistory>({
    offset: 0,
    limit: 5,
  });

  // const onClick = (month: string) => {
  //   setSelected(month);
  // };

  const getData = (input: TransactionHistory) => {
    getTransactionHIstory(input)
      .then((res) => {
        if (res.data.status == 0) {
          setTransaction((data) => [...data, ...res.data.data.records]);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const onCLickShowMore = () => {
    setInput((val) => {
      const newVal = {
        offset: val.offset + val.limit,
        limit: val.limit + 5,
      };
      return newVal;
    });
  };

  useEffect(() => {
    getData(input);
  }, [input]);

  // const month = ["Maret", "Mei", "Juni", "Juli", "Agustus", "September"];

  return (
    <div className="container mx-auto pt-12">
      <Information />
      <div className="mt-8">
        <div className="font-semibold">Semua Transaksi</div>
        {/* <div className="flex gap-4 mt-2">
          {month.map((item, index) => (
            <button
              className={`${selected == item ? "" : "text-gray-400"}`}
              key={index}
              onClick={() => onClick(item)}
            >
              {item}
            </button>
          ))}
        </div> */}
        <div className="flex flex-col gap-2 mt-4">
          {transaction.map((item, index) => (
            <div
              className="border border-gray-400 rounded-sm flex justify-between py-2 px-3"
              key={index}
            >
              <div>
                <div
                  className={`text-lg gap-2 ${
                    item.transaction_type.includes("TOPUP")
                      ? "text-green-500"
                      : "text-red-500"
                  } flex`}
                >
                  <div>
                    {item.transaction_type.includes("TOPUP") ? "+" : "-"}
                  </div>
                  Rp {item.total_amount}
                </div>
                <div className="text-gray-400 text-[10px]">
                  {DateTime.fromISO(item.created_on)
                    .setLocale("id")
                    .toLocaleString(DateTime.DATETIME_FULL)}
                </div>
              </div>
              <div className="text-[10px]">{item.description}</div>
            </div>
          ))}
          {!transaction.length && (
            <div className="flex justify-center">
              <div className="text-xs font-light text-gray-400">
                Maaf tidak ada histori transaksi saat ini
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-center">
          <Button className="text-red-500" onClick={onCLickShowMore}>
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
