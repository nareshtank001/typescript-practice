let mynumber: number = 5;
let testNumber = 10;

let answerbook: { id: number; barcode: string } = {
	id: 1,
	barcode: "0001"
};

let myfunction: (i: number, test: string) => void = (
	i: number,
	test: string
) => {
	return 10;
};
console.log(myfunction(10, "12312"));
