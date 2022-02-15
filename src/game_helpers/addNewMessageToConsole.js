// There is array of messages that show on the Console component. Removes last message on array and adds new one.
function addNewMessageToConsole(prevArr, newMessage) {
    let newArr = [...prevArr];
    newArr.shift();
    newArr.push(newMessage);
    return newArr;
}

export default addNewMessageToConsole
