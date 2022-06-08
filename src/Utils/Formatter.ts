const Formatter = {
  money: (value: number) => {
    return `Rp ${value.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1.')}`
  },
}

export default Formatter
