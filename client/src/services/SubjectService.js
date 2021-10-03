
const ApiURL = "https://horologium.herokuapp.com";

const addSubjects = (userid, subjectname) => {
    return new Promise((resolve, reject) => {
        fetch(`${ApiURL}/users/subjects/${userid}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({subjectname: subjectname})
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
                return;
            }
            )
            .catch(err => {
                reject(err.message);
                return;
            })
    })
}

const delSubjects = (userid, subjectname) => {
    return new Promise((resolve, reject) => {
        fetch(`${ApiURL}/users/subjects/${userid}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({subjectname: subjectname})
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
                return;
            }
            )
            .catch(err => {
                reject(err.message);
                return;
            })
    })
}

const callSubjects = (userid) => {
    return new Promise((resolve, reject) => {
        fetch(`${ApiURL}/users/subjects/${userid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
                return;
            }
            )
            .catch(err => {
                reject(err.message);
                return;
            })
    })
}
module.exports = {
    'callSubjects': callSubjects,
    'addSubjects': addSubjects,
    'delSubjects': delSubjects,
}