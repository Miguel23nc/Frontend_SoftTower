const PDetail = ({ content, value }) => {
  return (
    <p>
      <strong>{content}</strong>
      {value}
    </p>
  );
};

export default PDetail