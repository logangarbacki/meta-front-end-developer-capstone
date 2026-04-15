// Resource: https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js

const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

const fetchAPI = function (date) {
  let result = [];
  let random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ":00");
    }
    if (random() < 0.5) {
      result.push(i + ":30");
    }
  }
  return result;
};

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const registerUser = async function (username, password) {
  const response = await fetch(`${API_BASE}/auth/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

const loginUser = async function (username, password) {
  const response = await fetch(`${API_BASE}/auth/token/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

const logoutUser = async function (token) {
  await fetch(`${API_BASE}/auth/token/logout/`, {
    method: 'POST',
    headers: { 'Authorization': `Token ${token}` },
  });
};

const fetchMenuItems = async function () {
  const response = await fetch(`${API_BASE}/api/menu/?page_size=200`);
  if (!response.ok) throw new Error('Failed to fetch menu');
  const data = await response.json();
  // Handle both paginated {results:[]} and flat [] responses
  return Array.isArray(data) ? data : (data.results ?? data);
};

const fetchFeaturedItems = async function () {
  const response = await fetch(`${API_BASE}/api/menu/?featured=true`);
  if (!response.ok) throw new Error('Failed to fetch featured items');
  const data = await response.json();
  return Array.isArray(data) ? data : (data.results ?? data);
};

const to24Hour = function (time) {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':');
  hours = parseInt(hours);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
};

const submitAPI = async function (formData, token) {
  const time24 = formData.time.includes('M') ? to24Hour(formData.time) : formData.time;
  const payload = {
    name: formData.name,
    no_of_guests: parseInt(formData.guests),
    booking_date: `${formData.date}T${time24}:00+00:00`,
  };
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Token ${token}`;
  const response = await fetch(`${API_BASE}/api/bookings/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw err;
  }
  return true;
};

const fetchMyBookings = async function (token) {
  const response = await fetch(`${API_BASE}/api/bookings/mine/`, {
    headers: { 'Authorization': `Token ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
};

export { fetchAPI, fetchMenuItems, fetchFeaturedItems, submitAPI, fetchMyBookings, registerUser, loginUser, logoutUser };