const formatNumber = (number) => {
  number = number ? number : 0;
  let currentFormat = new Intl.NumberFormat("vn-VN");
  return currentFormat.format(number);
};

export default formatNumber;
