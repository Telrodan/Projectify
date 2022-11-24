export async function getUserDatabase() {
  let uri = 'http://localhost:3004/users';
  const res = await fetch(uri);
  const userDatabase = await res.json();
  return userDatabase;
}

export async function saveUser(user) {
  await fetch(`http://localhost:3004/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function saveNewUser(user) {
  await fetch('http://localhost:3004/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
}

export const verifyUser = user => {
  const userId = user.id;
  const isUserVerified = true;
  localStorage.setItem('userId', JSON.stringify(userId));
  localStorage.setItem('isUserVerified', JSON.stringify(isUserVerified));
};

// const logoutUser
