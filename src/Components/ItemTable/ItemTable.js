import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./ItemTable.css";

const itemData = [
  {
    value: "Potato",
    label: "Potato",
  },
  {
    value: "Speed",
    label: "Speed",
  },
  {
    value: "Mojo",
    label: "Mojo",
  },
  {
    value: "Mojo Cane",
    label: "Mojo Cane",
  },
];

export const ItemTable = () => {
  const [itemRow, setItemRow] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  console.log(totalDiscount, "total Discount");

  const itemSelect = (value) => {
    const objData = {
      ...value,
      price: "",
      quantity: 1,
      discount: "",
      netAmount: "",
    };
    setItemRow([...itemRow, objData]);
  };

  const inputDataHandle = (name, value, index) => {
    const data = [...itemRow];
    data[index][name] = value;
    setItemRow(data);
  };

  useEffect(() => {
    const totalDiscount = itemRow.reduce(
      (oldValue, newValue) => +oldValue + +newValue?.discount,
      0
    );
    setTotalDiscount(totalDiscount);

    const totalAmount = itemRow.reduce(
      (oldValue, newValue) => +oldValue + +newValue?.netAmount,
      0
    );
    setTotalAmount(totalAmount);
  }, [itemRow]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="w-50 mt-5 mb-4 ">
          <Select
            name="item"
            options={itemData}
            onChange={(value) => itemSelect(value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table custom-table">
          <thead>
            <tr>
              <th>sl</th>
              <th>product Name</th>
              <th>price</th>
              <th>quantity</th>
              <th>discount</th>
              <th>net amount</th>
            </tr>
          </thead>
          <tbody>
            {itemRow?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.label}</td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={item?.price}
                    onChange={(e) => {
                      inputDataHandle(e.target.name, e.target.value, index);
                      const netAmount = e.target.value - item.discount || 0;
                      inputDataHandle("netAmount", netAmount, index);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={item?.quantity}
                    onChange={(e) => {
                      inputDataHandle(e.target.name, e.target.value, index);
                      const quantity = e.target.value * item.price;
                      inputDataHandle("netAmount", quantity, index);
                    }}
                  />
                </td>
                <td>
                  <input
                    name="discount"
                    value={item.discount}
                    onChange={(e) => {
                      inputDataHandle(e.target.name, e.target.value, index);
                      const discount = item.price - e.target.value;
                      inputDataHandle("netAmount", discount, index);
                    }}
                  />
                </td>
                <td>{item.netAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <h4>TotalDiscount: {totalDiscount}</h4>
        <h4 className="ml-5">TotalAmount: {totalAmount}</h4>
      </div>
    </>
  );
};
