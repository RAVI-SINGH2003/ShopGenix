class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };

    //Removing some fields for category
    const removeFields = ["keyword", "page", "limit",];
    removeFields.forEach((e) => delete queryCopy[e]);

    //Filter For Price and Rating
      // { price: { gt: '1200', lt: '2000' } }

    // console.log(queryCopy);
    
    
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    // console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = (currentPage - 1) * resultPerPage;
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
   
  }
}

module.exports = ApiFeatures;
