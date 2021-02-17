class Channel {
    constructor(ChannelName, numberOfSubscribers, numberOfVideos) {
        this.name = ChannelName
        this.numberOfSubscribers = numberOfSubscribers
        this.numberOfVideos = numberOfVideos
    }
}

class RawChannelInformation {
    constructor(ChannelName, secondaryInformation) {
        this.name = ChannelName
        this.secondaryInformation = secondaryInformation
    }
}

function main() {

    let sectionsContainerElement = document.getElementById("contents")
    let sectionsContainerHTMLCollection = sectionsContainerElement.getElementsByClassName("style-scope ytd-section-list-renderer")



    let arrayOfChannelsArrays = []

    for (let section of sectionsContainerHTMLCollection) {

        let rawInformationArray = ExtractRawChannelInfo(section)

        let rawInformationClassArray = toRawInformationClass(rawInformationArray)

        let arrayOfChannels = toArrayOfChannels(rawInformationClassArray)

        arrayOfChannelsArrays.push(arrayOfChannels)
    }

    let fullChannelsArray = arrayOfChannelsArrays.flat(1);

    let leastHardWorkingArray = leastHardWorking(fullChannelsArray)

    console.log(leastHardWorkingArray)


}

function mostPopular(arrayOfChannels) {
    return arrayOfChannels.sort((firstNumber, secondNumber) =>
        parseFloat(secondNumber.numberOfSubscribers) - parseFloat(firstNumber.numberOfSubscribers))
}

function leastPopular(arrayOfChannels) {
    return arrayOfChannels.sort((firstNumber, secondNumber) =>
        parseFloat(firstNumber.numberOfSubscribers) - parseFloat(secondNumber.numberOfSubscribers))
}

function mostHardWorking(arrayOfChannels) {
    return arrayOfChannels.sort((firstNumber, secondNumber) =>
        parseFloat(secondNumber.numberOfVideos) - parseFloat(firstNumber.numberOfVideos))
}

function leastHardWorking(arrayOfChannels) {
    return arrayOfChannels.sort((firstNumber, secondNumber) =>
        parseFloat(firstNumber.numberOfVideos) - parseFloat(secondNumber.numberOfVideos))
}

function toArrayOfChannels(rowInformationArray) {
    return rowInformationArray.map(channel => {

        if (channel.secondaryInformation.includes("подписчиков") || channel.secondaryInformation.includes("подписчик")) {
            let subsAndVideosArray = channel.secondaryInformation.split("•")
            let RawNumberOfSubscribers = subsAndVideosArray[0]
            let RawNumberOfVideos = subsAndVideosArray[1]

            let channelName = channel.name
            let numberOfSubscribers = subCountHandler(RawNumberOfSubscribers)
            let numberOfVideos = videoCountHandler(RawNumberOfVideos)

            return new Channel(channelName, numberOfSubscribers, numberOfVideos)

        } else {
            let channelName = channel.name
            let numberOfSubscribers = 0
            let RawNumberOfVideos = channel.secondaryInformation
            let numberOfVideos = videoCountHandler(RawNumberOfVideos)

            return new Channel(channelName, numberOfSubscribers, numberOfVideos)
        }
    })
}

function toRawInformationClass(ChannelInformationArray) {
    return ChannelInformationArray.map(channel => {
        return new RawChannelInformation(channel[0], channel[1])

    })
}

function ExtractRawChannelInfo(HTMLCollectionOfChannels) {
    let RawChannelInfoArray = toArray(HTMLCollectionOfChannels.getElementsByClassName("style-scope ytd-expanded-shelf-contents-renderer"))
    RawChannelInfoArray.shift()
    RawChannelInfoArray.splice(-3)

    return RawChannelInfoArray.map(channel => {
        return (channel.innerText)
            .split("\n")
            .slice(0, 2)
    })
}

function subCountHandler(subCount) {
    let subCountWithType = subCount
        .replace("млн подписчиков", "-M")
        .replace("тыс. подписчиков", "-T")
        .replace("подписчиков", "-S")
        .replace("подписчик", "-S")
        .replace(/\s+/g, '')

    let subCountResult = 0
    let withOutType = ""

    if (subCountWithType.includes("S")) {
        withOutType = subCountWithType.replace("S", "")
        subCountResult = subCountToInt(withOutType, 1)
    }
    if (subCountWithType.includes("T")) {
        withOutType = subCountWithType.replace("T", "")
        subCountResult = subCountConverter(withOutType, 1)
    }
    if (subCountWithType.includes("M")) {
        withOutType = subCountWithType.replace("M", "")
        subCountResult = subCountConverter(withOutType, 1000)
    }
    return subCountResult
}

function videoCountHandler(videoCount) {
    if (videoCount !== undefined && videoCount.includes(" видео")) {
        videoCount = videoCount
            .replace(" видео", "")
            .replace(/\s+/g, '')
    }
    return videoCount
}

function subCountToInt(subCount, multiplier) {
    let subCountInt = subCount
        .replace("-", "")
        .replace(",", "")
    return subCountInt * multiplier
}

function subCountConverter(subCount, multiplier) {

    const oneDigitNumber = /^(\d-)*$/
    const twoDigitNumber = /^(\d{2}-)*$/
    const threeDigitNumber = /^(\d{3}-)*$/
    const oneDigitNumberOneDecimalPlace = /^(\d(,\d)-)*$/
    const oneDigitNumberTwoDecimalPlaces = /^(\d(,\d{2})-)*$/
    const twoDigitNumberOneDecimalPlace = /^(\d{2}(,\d)-)*$/
    const twoDigitNumberTwoDecimalPlaces = /^(\d{2}(,\d{2})-)*$/

    let subCountResult = 0

    if (subCount.match(oneDigitNumber) || subCount.match(twoDigitNumber) || subCount.match(threeDigitNumber)) {
        subCountResult = subCountToInt(subCount, multiplier * 1000)
    }
    if (subCount.match(oneDigitNumberOneDecimalPlace) || subCount.match(twoDigitNumberOneDecimalPlace)) {
        subCountResult = subCountToInt(subCount, multiplier * 100)
    }
    if (subCount.match(oneDigitNumberTwoDecimalPlaces) || subCount.match(twoDigitNumberTwoDecimalPlaces)) {
        subCountResult = subCountToInt(subCount, multiplier * 10)
    }
    return subCountResult
}

function getElementsArray(elementId) {
    return toArray(document.getElementById(elementId).childNodes)
}

function toArray(nodeList) {
    let nodeArray = [];
    for (let element = nodeList.length; element--;) {
        nodeArray[element] = nodeList[element];
    }
    return nodeArray;
}
