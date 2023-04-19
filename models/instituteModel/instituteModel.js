export const findTpoWithPaginate = async (

    model,
    query,
    projection,
    page,
    limit
  ) => {
    try {
      const skip = (page - 1) * limit;
  
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: "institutes",
            localField: "institute_id",
            foreignField: "_id",
            as: "institute_data",
          },
        },
        { $unwind: "$institute_data" },
        {
          $project: projection,
        },
        { $skip: skip },
        { $limit: limit },
      ];
       
      const result = await model.aggregate(pipeline);
  
      return { status: 1, data: result };
    } catch (error) {
      return { status: 0, data: error.message };
    }
  };

 