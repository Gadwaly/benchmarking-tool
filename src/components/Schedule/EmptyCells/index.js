const EmptyCells = (count) => {
  if (count < 0) return null;
  return (
    <>
      {[...Array(count)].map((value, index) => {
        return <td key={index}></td>;
      })}
    </>
  );
};

export default EmptyCells;
