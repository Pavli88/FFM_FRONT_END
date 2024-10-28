export const cumulativeMultiply = (arr) => {
    let value = 1;
    let list = [];
    for (let i = 0; i < arr.length; i += 1) {
        value *= arr[i];
        list.push(value);
    }
    return list;
};

export const cumulativeSum = (arr) => {
    const creds = arr.reduce(
        (acc, val) => {
            let { sum, res } = acc;
            sum += val;
            res.push(sum);
            return { sum, res };
        },
        {
            sum: 0,
            res: [],
        }
    );
    return creds.res;
};