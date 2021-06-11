function addNewMessageToDescription(prevArr, newMessage) {
    let newArr = [...prevArr];
    newArr.shift();
    newArr.push(newMessage);
    return newArr;
}

export default addNewMessageToDescription