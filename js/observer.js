// Known as suscriptor-publisher pattern too

let observer = {
    retrieveOffer: function (callback) {
        if (typeof callback === 'function') {
            this.subcribers[this.subscribers.length] = callback;
        }
    },
    cancelOffer: function (callback) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete this.subscribers[i];
            }
        }
    },
    publishOffer: function (offer) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](offer);
            }
        }
    },
    create: function (object) {
        for (let i in this) {
            if (this.hasOwnProperty(i)) {
                object[i] = this[i];
                object.subscribers = [];
            }
        }
    }
};

// Sellers

const udemy = {
    newCourse: function () {
        const course = 'A new course of Javascript!!!';
        this.publishOffer(course);
    }
}

const facebook = {
    newAd: function () {
        const offer = 'Buy a new mobile!!!';
        this.publishOffer(offer);
    }
};

// Create publishers

observer.create(udemy);
console.log(observer);
observer.create(facebook);

const john = {
    share: function (offer) {
        console.log(`Excellent offer! ${offer}`);
    }
};

const lucas = {
    interested: function (offer) {
        console.log(`I'm interested in the offer! ${offer}`);
    }
};

udemy.retrieveOffer(john.share);
udemy.retrieveOffer(lucas.interested);
udemy.newCourse();