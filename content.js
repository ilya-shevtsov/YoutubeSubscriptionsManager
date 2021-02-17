console.log("Youtube Subscriptions Manager has started 5.0")

let channelsElement = document.getElementById("grid-container").childNodes

let channelsElementsArray = toArray(channelsElement)

let channelsInformationArray = []

for (let channel of channelsElementsArray) {
    let channelInformation = channel.innerText
    channelsInformationArray.push(channelInformation)
}

let haha = channelsInformationArray.map()


console.log(channelsInformationArray)


function toArray(nodeList) {
    let nodeArray = [];
    for (let element = nodeList.length >>> 0; element--;) {
        nodeArray[element] = nodeList[element];
    }
    return nodeArray;
}