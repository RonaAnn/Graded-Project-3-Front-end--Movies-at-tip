const avgRating = (ratings: any) => {
    if (ratings) {
        let total = ratings?.reduce((a: number, b: number) => Math.floor(a) + Math.floor(b), 0);
        return (total / (ratings.length) / 2);
    }

    return 0;
}

export { avgRating }