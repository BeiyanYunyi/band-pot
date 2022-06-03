const getAryRandomItem = <T>(ary: T[]) => ary[Math.floor(Math.random() * ary.length)];

export default getAryRandomItem;
