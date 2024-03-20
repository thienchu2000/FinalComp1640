module.exports = {
  formatDate: function (dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  },
  ifEqual: function (a, b, options) {
    if (a.equals(b)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
};
