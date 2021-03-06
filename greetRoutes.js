module.exports = function (instance) {
    async function index (req, res, next) {
        try {
            const counter = await instance.count();
            res.render('index', {
                count: counter,
                title: 'Greetings',
                dropdown: ['Zulu', 'English', 'Xhosa', 'Afrikaans', 'Tsonga'],
                name: instance.hello()
            });
        } catch (err) {
            next(err);
        }
    }

    async function addName (req, res) {
        const name = req.body.nameInput;
        const regex = /\d/;
        const test = regex.test(name);
        if (test === true) {
            instance.clearGreeting();
            req.flash('info', 'Please use letters only!');
        } else {
            if (req.body.language) {
                await instance.add(name, req.body.language);
            } else {
                instance.clearGreeting();
                req.flash('info', 'Please select Language!');
            }
        }
        res.redirect('/');
    }

    async function countFor (req, res) {
        const name = req.params.userName;
        await instance.who(req.params.userName);
        const counter = await instance.userCount(name);
        res.render('user', {
            isUser: name,
            count: counter
        });
    }

    async function greeted (req, res) {
        const names = await instance.names();
        console.log(names);
        res.render('greeted', { allnames: names });
    }

    async function delet (req, res) {
        await instance.delete();
        req.flash('reset', 'App has been restarted!');
        res.redirect('/');
    }
    return {
        index,
        addName,
        countFor,
        greeted,
        delet
    };
};
