// ============================================================
// ALGONQUIN SHARED PACKING LIST
// Main application
// ============================================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  remove
} from
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

import { firebaseConfig } from "./firebase-config.js";


// ============================================================
// FIREBASE INITIALIZATION
// ============================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);


// ============================================================
// DOM ELEMENTS
// ============================================================

const listElement =
  document.getElementById("list");

const nameInput =
  document.getElementById("myName");

const progressText =
  document.getElementById("progressText");

const progressBar =
  document.getElementById("progressBar");

const statusElement =
  document.getElementById("connectionStatus");

const statusText =
  document.getElementById("statusText");

const addItemButton =
  document.getElementById("addItem");

const clearDoneButton =
  document.getElementById("clearDone");

const copyLinkButton =
  document.getElementById("copyLink");

const addDialog =
  document.getElementById("addDialog");

const addForm =
  document.getElementById("addForm");

const closeDialog =
  document.getElementById("closeDialog");

const newCategoryInput =
  document.getElementById("newCategory");

const newItemInput =
  document.getElementById("newItem");

const newWhoInput =
  document.getElementById("newWho");

const toastElement =
  document.getElementById("toast");


// ============================================================
// LOCAL STORAGE
// ============================================================

const savedName =
  localStorage.getItem("algonquinPackingName");

if (savedName) {
  nameInput.value = savedName;
}


nameInput.addEventListener("input", () => {

  localStorage.setItem(
    "algonquinPackingName",
    nameInput.value.trim()
  );

});


// ============================================================
// INITIAL PACKING LIST
// ============================================================

const INITIAL_ITEMS = [

  // ----------------------------------------------------------
  // Sleeping & Bedding
  // ----------------------------------------------------------

  {
    category: "Sleeping & Bedding",
    item: "Sheets + blankets (2 Queen, 2 Double)",
    who: ""
  },

  {
    category: "Sleeping & Bedding",
    item: "6 pillows",
    who: ""
  },


  // ----------------------------------------------------------
  // Power & Electronics
  // ----------------------------------------------------------

  {
    category: "Power & Electronics",
    item: "1–2 extension cords",
    who: "BM"
  },

  {
    category: "Power & Electronics",
    item: "Power bar",
    who: ""
  },

  {
    category: "Power & Electronics",
    item: "Phone chargers",
    who: ""
  },

  {
    category: "Power & Electronics",
    item: "Headlamps / flashlights",
    who: ""
  },

  {
    category: "Power & Electronics",
    item: "Extra battery / power bank",
    who: ""
  },


  // ----------------------------------------------------------
  // Cooking
  // ----------------------------------------------------------

  {
    category: "Cooking",
    item: "Frying pans",
    who: ""
  },

  {
    category: "Cooking",
    item: "Electric kettle",
    who: ""
  },

  {
    category: "Cooking",
    item: "Pots / saucepan",
    who: ""
  },

  {
    category: "Cooking",
    item: "BBQ tongs + spatula",
    who: "BM"
  },

  {
    category: "Cooking",
    item: "Kitchen knife",
    who: ""
  },

  {
    category: "Cooking",
    item: "Cutting board",
    who: ""
  },

  {
    category: "Cooking",
    item: "Can opener",
    who: ""
  },

  {
    category: "Cooking",
    item: "Bottle opener",
    who: ""
  },

  {
    category: "Cooking",
    item: "Serving spoons",
    who: ""
  },

  {
    category: "Cooking",
    item: "Aluminum foil",
    who: ""
  },

  {
    category: "Cooking",
    item: "Ziplock bags",
    who: ""
  },

  {
    category: "Cooking",
    item: "Food containers",
    who: ""
  },

  {
    category: "Cooking",
    item: "Dishes & Utensils",
    who: ""
  },

  {
    category: "Cooking",
    item: "Plates",
    who: ""
  },

  {
    category: "Cooking",
    item: "Bowls",
    who: ""
  },

  {
    category: "Cooking",
    item: "Forks",
    who: ""
  },

  {
    category: "Cooking",
    item: "Knives",
    who: ""
  },

  {
    category: "Cooking",
    item: "Spoons",
    who: ""
  },

  {
    category: "Cooking",
    item: "Mugs",
    who: ""
  },


  // ----------------------------------------------------------
  // Cleaning
  // ----------------------------------------------------------

  {
    category: "Cleaning",
    item: "Dish soap",
    who: ""
  },

  {
    category: "Cleaning",
    item: "Sponges",
    who: ""
  },

  {
    category: "Cleaning",
    item: "Dish towels",
    who: ""
  },

  {
    category: "Cleaning",
    item: "Paper towels",
    who: ""
  },

  {
    category: "Cleaning",
    item: "Garbage bags",
    who: ""
  },

  {
    category: "Cleaning",
    item: "Hand soap",
    who: ""
  },

  {
    category: "Cleaning",
    item: "Hand sanitizer",
    who: ""
  },


  // ----------------------------------------------------------
  // Drinks & Coolers
  // ----------------------------------------------------------

  {
    category: "Drinks & Coolers",
    item: "Coolers",
    who: ""
  },

  {
    category: "Drinks & Coolers",
    item: "Lots of ice",
    who: ""
  },

  {
    category: "Drinks & Coolers",
    item: "Water bottles",
    who: ""
  },

  {
    category: "Drinks & Coolers",
    item: "Large water container",
    who: ""
  },

  {
    category: "Drinks & Coolers",
    item: "Coffee / tea",
    who: ""
  },

  {
    category: "Drinks & Coolers",
    item: "Milk / creamer",
    who: ""
  },

  {
    category: "Drinks & Coolers",
    item: "Electrolytes",
    who: ""
  },


  // ----------------------------------------------------------
  // Bugs & Safety
  // ----------------------------------------------------------

  {
    category: "Bugs",
    item: "Bug spray",
    who: ""
  },

  {
    category: "Bugs",
    item: "Sunscreen SPF 30+",
    who: ""
  },

  {
    category: "Bugs",
    item: "3–4 spare toilet paper rolls",
    who: ""
  },

  {
    category: "Bugs",
    item: "Wet wipes",
    who: ""
  },

  {
    category: "Bugs",
    item: "First-aid kit",
    who: ""
  },

  {
    category: "Bugs",
    item: "Offline maps (download)",
    who: ""
  },

  {
    category: "Bugs",
    item: "Extra battery / power bank",
    who: ""
  },

  {
    category: "Bugs",
    item: "Lighter",
    who: ""
  },

  {
    category: "Bugs",
    item: "Waterproof matches",
    who: ""
  },

  {
    category: "Bugs",
    item: "Fire starters",
    who: ""
  },


  // ----------------------------------------------------------
  // Fun
  // ----------------------------------------------------------

  {
    category: "Fun",
    item: "Cards",
    who: ""
  },

  {
    category: "Fun",
    item: "Uno",
    who: "BM"
  },

  {
    category: "Fun",
    item: "Board game",
    who: ""
  },

  {
    category: "Fun",
    item: "Frisbee / ball",
    who: ""
  },

  {
    category: "Fun",
    item: "Binoculars",
    who: ""
  },

  {
    category: "Fun",
    item: "Speaker",
    who: ""
  },

  {
    category: "Fun",
    item: "Jumper cables",
    who: ""
  },

  {
    category: "Fun",
    item: "Full tank of gas",
    who: ""
  },

  {
    category: "Fun",
    item: "Camp chairs (dont need 7)",
    who: ""
  },


  // ----------------------------------------------------------
  // Food
  // ----------------------------------------------------------

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "24 eggs",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Bread",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Fruit",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Sandwich / wrap supplies",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "12 burgers",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "12 sausages / hot dogs",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Buns",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Cheese",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Lettuce / tomato / onion",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Condiments",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Chips",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Lettuce / tomatoes",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Hummus",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Guacamole",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Pasta",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Pasta sauce",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Ground chicken",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Salad",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Tuesday",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Bagels / muffins",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Fruit",

    who: ""
  },

  {
    category:
      "Food · FreshCo / Metro / Farmer’s Daughter in Huntsville",

    item: "Canned beans",

    who: ""
  }

];


// ============================================================
// APPLICATION STATE
// ============================================================

let currentUser = null;

let items = {};

let databaseReady = false;


// ============================================================
// UI HELPERS
// ============================================================

let toastTimer = null;


function showToast(message) {

  if (!toastElement) {
    return;
  }

  toastElement.textContent = message;

  toastElement.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toastElement.classList.remove("show");

  }, 2400);

}


function setStatus(state, message) {

  statusElement.classList.remove(
    "online",
    "offline",
    "syncing"
  );

  statusElement.classList.add(state);

  statusText.textContent = message;

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

  const div = document.createElement("div");

  div.textContent = value ?? "";

  return div.innerHTML;

}


// ============================================================
// CREATE INITIAL DATABASE
// ============================================================

async function createInitialList() {

  const listRef =
    ref(db, "packingList");

  const snapshot =
    await new Promise((resolve, reject) => {

      onValue(
        listRef,
        resolve,
        {
          onlyOnce: true
        }
      );

    });


  if (snapshot.exists()) {

    return;

  }


  const initialData = {};

  INITIAL_ITEMS.forEach((entry, index) => {

    const key =
      `item_${String(index + 1).padStart(3, "0")}`;

    initialData[key] = {

      category: entry.category,

      item: entry.item,

      who: entry.who || "",

      done: false,

      createdAt:
        Date.now() + index

    };

  });


  await set(
    listRef,
    initialData
  );

}


// ============================================================
// AUTHENTICATION
// ============================================================

async function startAuthentication() {

  setStatus(
    "syncing",
    "Connecting"
  );


  try {

    await signInAnonymously(auth);

  }

  catch (error) {

    console.error(
      "Anonymous authentication failed:",
      error
    );

    setStatus(
      "offline",
      "Authentication failed"
    );

    showToast(
      "Could not connect to Firebase."
    );

  }

}


// ============================================================
// AUTH STATE
// ============================================================

onAuthStateChanged(
  auth,
  async (user) => {

    if (!user) {

      currentUser = null;

      return;

    }


    currentUser = user;

    databaseReady = true;


    try {

      setStatus(
        "syncing",
        "Loading list"
      );


      await createInitialList();


      listenToList();


      setStatus(
        "online",
        "Live"
      );

    }

    catch (error) {

      console.error(
        "Database initialization error:",
        error
      );

      setStatus(
        "offline",
        "Database error"
      );

      showToast(
        "Could not load the shared list."
      );

    }

  }
);


// ============================================================
// REALTIME DATABASE LISTENER
// ============================================================

function listenToList() {

  const listRef =
    ref(db, "packingList");


  onValue(
    listRef,
    (snapshot) => {

      items =
        snapshot.val() || {};

      renderList();

      updateProgress();


      if (databaseReady) {

        setStatus(
          "online",
          "Live"
        );

      }

    },

    (error) => {

      console.error(
        "Realtime Database error:",
        error
      );

      setStatus(
        "offline",
        "Offline"
      );

    }

  );

}


// ============================================================
// GROUP ITEMS BY CATEGORY
// ============================================================

function groupItems() {

  const groups = {};

  Object.entries(items).forEach(
    ([id, item]) => {

      const category =
        item.category || "Other";


      if (!groups[category]) {

        groups[category] = [];

      }


      groups[category].push({

        id,

        ...item

      });

    }
  );


  return groups;

}


// ============================================================
// RENDER LIST
// ============================================================

function renderList() {

  if (!listElement) {
    return;
  }


  const groups =
    groupItems();


  const categories =
    Object.keys(groups);


  if (categories.length === 0) {

    listElement.innerHTML = `
      <div class="empty">
        Nothing on the list yet.
      </div>
    `;

    return;

  }


  let html = "";


  categories.forEach(
    (category, categoryIndex) => {

      const categoryItems =
        groups[category];


      html += `
        <section
          class="category"
          data-category="${escapeHTML(category)}"
        >

          <div class="category-label">
            ${String(categoryIndex + 1).padStart(2, "0")}
            /
            ${escapeHTML(category)}
          </div>

          <div class="table">
      `;


      categoryItems.forEach(
        (entry) => {

          const checked =
            entry.done === true;

          const who =
            entry.who || "";


          html += `
            <div
              class="row ${checked ? "done" : ""}"
              data-id="${escapeHTML(entry.id)}"
            >

              <div class="check-cell">

                <input
                  type="checkbox"
                  class="check"
                  ${checked ? "checked" : ""}
                  aria-label="Mark ${escapeHTML(entry.item)} as packed"
                >

              </div>


              <div class="item">
                ${escapeHTML(entry.item)}
              </div>


              <div class="who">

                <input
                  type="text"
                  maxlength="40"
                  value="${escapeHTML(who)}"
                  placeholder="Who is bringing it?"
                  aria-label="Who is bringing ${escapeHTML(entry.item)}?"
                >

              </div>


              <button
                type="button"
                class="delete"
                title="Delete item"
                aria-label="Delete ${escapeHTML(entry.item)}"
              >
                ×
              </button>

            </div>
          `;

        }
      );


      html += `
          </div>

        </section>
      `;

    }
  );


  listElement.innerHTML = html;


  attachRowEvents();

}


// ============================================================
// ATTACH ROW EVENTS
// ============================================================

function attachRowEvents() {

  const rows =
    listElement.querySelectorAll(".row");


  rows.forEach((row) => {

    const id =
      row.dataset.id;


    const checkbox =
      row.querySelector(".check");


    const whoInput =
      row.querySelector(".who input");


    const deleteButton =
      row.querySelector(".delete");


    // --------------------------------------------------------
    // Checkbox
    // --------------------------------------------------------

    checkbox.addEventListener(
      "change",
      async () => {

        if (!databaseReady) {
          return;
        }


        try {

          setStatus(
            "syncing",
            "Saving"
          );


          await update(
            ref(db, `packingList/${id}`),
            {
              done: checkbox.checked
            }
          );


          setStatus(
            "online",
            "Live"
          );

        }

        catch (error) {

          console.error(
            "Could not update item:",
            error
          );

          checkbox.checked =
            !checkbox.checked;

          showToast(
            "Could not save that change."
          );

          setStatus(
            "offline",
            "Save failed"
          );

        }

      }
    );


    // --------------------------------------------------------
    // Who input
    // --------------------------------------------------------

    let whoTimer = null;


    whoInput.addEventListener(
      "input",
      () => {

        clearTimeout(whoTimer);


        whoTimer =
          setTimeout(
            async () => {

              if (!databaseReady) {
                return;
              }


              const value =
                whoInput.value.trim();


              try {

                await update(
                  ref(
                    db,
                    `packingList/${id}`
                  ),
                  {
                    who: value
                  }
                );

              }

              catch (error) {

                console.error(
                  "Could not save person:",
                  error
                );

                showToast(
                  "Could not save that name."
                );

              }

            },
            500
          );

      }
    );


    // --------------------------------------------------------
    // Delete
    // --------------------------------------------------------

    deleteButton.addEventListener(
      "click",
      async () => {

        const item =
          items[id];


        if (!item) {
          return;
        }


        const confirmed =
          window.confirm(
            `Remove "${item.item}" from the list?`
          );


        if (!confirmed) {
          return;
        }


        try {

          setStatus(
            "syncing",
            "Saving"
          );


          await remove(
            ref(db, `packingList/${id}`)
          );


          showToast(
            "Item removed."
          );


          setStatus(
            "online",
            "Live"
          );

        }

        catch (error) {

          console.error(
            "Could not delete item:",
            error
          );

          showToast(
            "Could not remove that item."
          );

          setStatus(
            "offline",
            "Save failed"
          );

        }

      }
    );

  });

}


// ============================================================
// PROGRESS
// ============================================================

function updateProgress() {

  const allItems =
    Object.values(items);


  const total =
    allItems.length;


  const completed =
    allItems.filter(
      item => item.done === true
    ).length;


  progressText.textContent =
    `${completed} / ${total}`;


  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );


  progressBar.style.width =
    `${percentage}%`;

}


// ============================================================
// ADD ITEM DIALOG
// ============================================================

addItemButton.addEventListener(
  "click",
  () => {

    newCategoryInput.value = "";

    newItemInput.value = "";

    newWhoInput.value = "";


    addDialog.showModal();


    setTimeout(
      () => newCategoryInput.focus(),
      50
    );

  }
);


// ============================================================
// CLOSE DIALOG
// ============================================================

closeDialog.addEventListener(
  "click",
  () => {

    addDialog.close();

  }
);


addDialog.addEventListener(
  "click",
  (event) => {

    const rect =
      addDialog.getBoundingClientRect();


    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;


    if (!inside) {

      addDialog.close();

    }

  }
);


// ============================================================
// ADD ITEM
// ============================================================

addForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    if (!databaseReady) {

      showToast(
        "The shared list is still connecting."
      );

      return;

    }


    const category =
      newCategoryInput.value.trim();


    const item =
      newItemInput.value.trim();


    const who =
      newWhoInput.value.trim();


    if (!category || !item) {

      return;

    }


    try {

      setStatus(
        "syncing",
        "Saving"
      );


      const listRef =
        ref(db, "packingList");


      const newItemRef =
        push(listRef);


      await set(
        newItemRef,
        {

          category,

          item,

          who,

          done: false,

          createdAt:
            Date.now()

        }
      );


      addDialog.close();


      showToast(
        "Added to the list."
      );


      setStatus(
        "online",
        "Live"
      );

    }

    catch (error) {

      console.error(
        "Could not add item:",
        error
      );

      showToast(
        "Could not add that item."
      );

      setStatus(
        "offline",
        "Save failed"
      );

    }

  }
);


// ============================================================
// CLEAR CHECKED ITEMS
// ============================================================

clearDoneButton.addEventListener(
  "click",
  async () => {

    if (!databaseReady) {

      showToast(
        "The shared list is still connecting."
      );

      return;

    }


    const completed =
      Object.entries(items)
        .filter(
          ([, item]) =>
            item.done === true
        );


    if (completed.length === 0) {

      showToast(
        "There are no checked items."
      );

      return;

    }


    const confirmed =
      window.confirm(
        `Remove ${completed.length} checked item${completed.length === 1 ? "" : "s"} from the list?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setStatus(
        "syncing",
        "Saving"
      );


      const updates = {};


      completed.forEach(
        ([id]) => {

          updates[
            `packingList/${id}`
          ] = null;

        }
      );


      await update(
        ref(db),
        updates
      );


      showToast(
        `${completed.length} checked item${completed.length === 1 ? "" : "s"} removed.`
      );


      setStatus(
        "online",
        "Live"
      );

    }

    catch (error) {

      console.error(
        "Could not clear checked items:",
        error
      );

      showToast(
        "Could not clear the checked items."
      );

      setStatus(
        "offline",
        "Save failed"
      );

    }

  }
);


// ============================================================
// COPY SHARE LINK
// ============================================================

copyLinkButton.addEventListener(
  "click",
  async () => {

    const url =
      window.location.href;


    try {

      await navigator.clipboard.writeText(
        url
      );


      showToast(
        "Share link copied."
      );

    }

    catch (error) {

      console.error(
        "Clipboard error:",
        error
      );


      window.prompt(
        "Copy this link:",
        url
      );

    }

  }
);


// ============================================================
// START
// ============================================================

startAuthentication();