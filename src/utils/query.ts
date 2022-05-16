export const createSearchQuery = (search?: string) => {
  if (search) {
    return {
      $or: [
        {
          name: {
            $regex: `${search}`,
            $options: 'i',
          },
        },
        {
          username: {
            $regex: `${search}`,
            $options: 'i',
          },
        },
        {
          address: {
            $regex: `${search}`,
            $options: 'i',
          },
        },
      ],
    };
  }

  return {};
};
