type IOptions = {
    page?: number;
    limit?: number;
};

export const calculatePagination = (option: IOptions) => {
    const { page = 1, limit = 10 } = option;

    const skip = (page - 1) * limit;

    return skip;
};
