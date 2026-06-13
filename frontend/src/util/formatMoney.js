const formatMoney = (money) => {
  if (!money) return "0";
  const value = money.$numberDecimal ? money.$numberDecimal.toString() : money;
  return Number(value).toLocaleString("en-US");
};

export default formatMoney;
