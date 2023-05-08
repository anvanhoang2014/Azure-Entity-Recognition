exports.index = (req, res) => {
    return res.render('./index.ejs');
}

exports.contact = (req, res) => {
    return res.render('./contact.ejs');
};

exports.about = (req, res) => {
    return res.render('./about.ejs');
};