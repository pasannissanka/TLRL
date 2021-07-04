import { Types } from 'mongoose';

// https://mongoplayground.net/p/PkbIeZDrs92
export const categoryAggregateQuery = (userId: Types.ObjectId) => {
  return [
    {
      $match: {
        userId: userId,
        parent: null,
      },
    },
    {
      $graphLookup: {
        from: 'categories',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parent',
        as: 'children',
        depthField: 'level',
      },
    },
    {
      $unwind: {
        path: '$children',
        includeArrayIndex: 'index',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: {
        'children.level': -1,
      },
    },
    {
      $group: {
        _id: '$_id',
        parent: { $first: '$parent' },
        children: { $push: '$children' },
        name: { $first: '$name' },
        bookmarks: { $first: '$bookmarks' },
        colorCode: { $first: '$colorCode' },
        userId: { $first: '$userId' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
      },
    },
    {
      $addFields: {
        children: {
          $reduce: {
            input: '$children',
            initialValue: {
              level: -1,
              presentChild: [],
              prevChild: [],
            },
            in: {
              $let: {
                vars: {
                  prev: {
                    $cond: [
                      {
                        $eq: ['$$value.level', '$$this.level'],
                      },
                      '$$value.prevChild',
                      '$$value.presentChild',
                    ],
                  },
                  current: {
                    $cond: [
                      {
                        $eq: ['$$value.level', '$$this.level'],
                      },
                      '$$value.presentChild',
                      [],
                    ],
                  },
                },
                in: {
                  level: '$$this.level',
                  prevChild: '$$prev',
                  presentChild: {
                    $concatArrays: [
                      '$$current',
                      [
                        {
                          $mergeObjects: [
                            '$$this',
                            {
                              children: {
                                $filter: {
                                  input: '$$prev',
                                  as: 'e',
                                  cond: {
                                    $eq: ['$$e.parent', '$$this._id'],
                                  },
                                },
                              },
                            },
                          ],
                        },
                      ],
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        children: '$children.presentChild',
      },
    },
  ];
};
