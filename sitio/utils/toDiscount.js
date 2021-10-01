

module.exports= (price,discount) => toThousand(price - (discount * price / 100))