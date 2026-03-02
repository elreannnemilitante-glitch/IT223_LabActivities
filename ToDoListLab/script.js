// Initialize DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Validate elements exist
if (!taskInput || !addBtn || !taskList) {
  console.error('Required DOM elements not found');
}

// Load and display saved tasks
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach(task => displayTask(task.text, task.completed));
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// Display task in the list
function displayTask(taskText, isCompleted = false) {
  if (!taskText || taskText.trim() === '') return;

  const li = document.createElement('li');
  if (isCompleted) li.classList.add('completed');

  // Task text element
  const span = document.createElement('span');
  span.textContent = taskText;
  span.style.cursor = 'pointer';
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  try {
    const tasks = [];
    const taskItems = document.querySelectorAll('#taskList li');

    taskItems.forEach(item => {
      const taskText = item.querySelector('span').textContent;
      const isCompleted = item.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}

// Add new task
function addNewTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  displayTask(taskText, false);
  saveTasks();
  taskInput.value = '';
  taskInput.focus();
}

// Event listeners
if (addBtn) {
  addBtn.addEventListener('click', addNewTask);
}

if (taskInput) {
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  });
}

// Load saved tasks on page load
window.addEventListener('load', loadTasks);
