module.exports = (keys) => ({
  public: new (require('./public'))(),
  private: new (require('./private'))(keys),
})