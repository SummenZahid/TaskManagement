import data from '../MockAPIs/data.json';

// Simulate an API request to fetch users
export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
    let users = window.localStorage.getItem('users');
    if(users){
        let parsed = JSON.parse(users);
        resolve(parsed);
    }

    }, 500); // Simulate a 500ms delay
  });
};

// Simulate an API request to fetch products
export const getGroups = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.groups);
    }, 500); // Simulate a 500ms delay
  });
};