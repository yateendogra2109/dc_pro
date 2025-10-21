import React from "react";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Note App</h1>
      <p style={styles.subtitle}>
        Simple Note Taking App — Add, View, and Manage Your Notes Easily!
      </p>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Welcome!</h2>
        <p style={styles.cardText}>
          Start by creating your first note. You can later add more features
          like editing, deleting, and saving notes.
        </p>
        <button style={styles.button}>Add Note</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f7f8fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    textAlign: "center",
  },
  cardTitle: {
    color: "#222",
    marginBottom: "10px",
  },
  cardText: {
    color: "#555",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;
