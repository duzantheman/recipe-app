module.exports = {
  ...require("@cgduzan/prettier-config"),
  importOrder: ["<THIRD_PARTY_MODULES>", "(?=^(../)(.*))", "(?=^(./)(.*))"]
};
