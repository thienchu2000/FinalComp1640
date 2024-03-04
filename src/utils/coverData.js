function covertData(data) {
  return data.map((result) => {
    return result.toJSON();
  });
}

module.exports = covertData;
