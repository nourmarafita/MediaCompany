const formatDate = (date) => {
    let text = date.toISOString().split('T');
    return text[0]

}
module.exports = formatDate