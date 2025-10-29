# Wind Turbine Explainer

A collection of interactive visualizations and educational tools for understanding wind turbine aerodynamics, blade harmonics, and the mathematics behind why wind turbines typically have three blades.

## 🎯 Purpose

This project was created to provide intuitive, hands-on explanations of wind turbine physics concepts that are often hidden behind complex equations. Through interactive 3D models and real-time data visualization, it makes advanced aerodynamic principles accessible to students, engineers, and anyone curious about renewable energy.

## 📚 What's Inside

### 1. **Interactive 3D Wind Turbine** (`turbine_3d_interactive.html`)
A fully interactive 3D wind turbine model built with Three.js that allows you to:
- Manipulate wind speed, direction, and turbulence in real-time
- Adjust turbine blade pitch and rotor speed
- Visualize power output, torque, and aerodynamic forces
- Control environmental conditions (time of day, cloud coverage)
- Explore turbine geometry parameters (blade count, tower height, blade radius)

**Features:**
- Real-time physics simulation
- Dynamic lighting and shadows
- Performance statistics dashboard
- Interactive camera controls
- Minimizable control panel for clean viewing

### 2. **Blade Harmonics Visualizer** (React App - `blade-harmonics-app/`)
An interactive React/TypeScript application that demonstrates the mathematical principles behind blade harmonics:
- Visualizes `sin(θ)` and `sin²(θ)` functions for multiple blades
- Shows how equally-spaced sinusoids sum to zero (explaining why blade vibrations cancel)
- Illustrates the rotational symmetry properties
- Interactive controls for number of blades, phase shift, and resolution
- Real-time charting with Recharts

**Key Concept:** Explains why the sum of forces from equally-spaced blades cancel out for `B ≥ 2` due to roots of unity theorem.

### 3. **Blade Harmonics Standalone** (`blade_harmonics.html`)
A standalone HTML version with Plotly that covers the same mathematical concepts as the React app, perfect for quick demonstrations without needing to run a development server.

### 4. **Jupyter Notebook** (`turbine_explainer.ipynb`)
Python/SymPy-based mathematical derivations for:
- Blade element velocity components
- Angle of attack calculations
- Wind turbine aerodynamic theory

## 🚀 Getting Started

### Interactive 3D Turbine
Simply open `turbine_3d_interactive.html` in a modern web browser. No installation required!

### Blade Harmonics Standalone
Open `blade_harmonics.html` in your web browser.

### React Blade Harmonics App
```bash
cd blade-harmonics-app
npm install
npm run dev
```

Visit `http://localhost:5173` (or the URL shown in your terminal).

### Jupyter Notebook
```bash
# Activate virtual environment (if not already activated)
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows

# Start Jupyter
jupyter notebook turbine_explainer.ipynb
```

## 🛠️ Technologies Used

- **Three.js**: 3D graphics and wind turbine visualization
- **React**: Interactive UI components
- **TypeScript**: Type-safe application logic
- **Recharts**: Beautiful, responsive charts for harmonics visualization
- **Plotly**: Alternative charting solution for standalone demos
- **SymPy**: Symbolic mathematics for theoretical derivations
- **Vite**: Modern, fast build tool for the React app
- **Jupyter**: Interactive computational environment

## 📖 Educational Value

### Why Three Blades?
This project demonstrates several key reasons:

1. **Harmonic Cancellation**: With 3 equally-spaced blades, the sum of aerodynamic forces cancels out perfectly during rotation, reducing vibration and stress on the tower.

2. **Structural Efficiency**: Three blades provide the optimal balance between:
   - Power capture efficiency
   - Material costs
   - Structural stability
   - Reduced noise

3. **Mathematical Beauty**: The visualizations show how the roots of unity theorem manifests in real-world engineering—equally-spaced blades create perfectly balanced forces.

### Key Learning Concepts

- **Blade Element Theory**: How wind interacts with different sections of the blade
- **Aerodynamic Forces**: Lift and drag on rotating blades
- **Harmonic Analysis**: Why blade count matters for vibration
- **Power Optimization**: Relationship between TSR (Tip Speed Ratio), blade pitch, and power output
- **Environmental Factors**: Impact of wind turbulence and direction changes

## 🎓 Who Is This For?

- **Students**: Learn wind turbine physics through interactive experiments
- **Educators**: Teaching tool for renewable energy courses
- **Engineers**: Quick reference for basic turbine dynamics
- **Enthusiasts**: Explore the fascinating world of wind energy
- **Researchers**: Starting point for more detailed aerodynamic studies

## 📝 Project Structure

```
WindTurbineExplainer/
├── turbine_3d_interactive.html   # Main 3D interactive turbine
├── blade_harmonics.html          # Standalone harmonics visualizer
├── blade-harmonics-app/          # React version of harmonics app
│   ├── src/
│   │   ├── App.tsx              # Main React component
│   │   └── App.css              # Styling
│   └── package.json
├── turbine_explainer.ipynb       # Mathematical derivations
├── package.json                  # Root dependencies
└── venv/                         # Python virtual environment
```

## 🎮 Usage Tips

### 3D Turbine
- **Left-click + drag**: Rotate camera
- **Right-click + drag**: Pan camera
- **Scroll**: Zoom in/out
- **Controls panel**: Minimize for better viewing
- Try extreme values to understand physical limits!

### Harmonics Visualizer
- Start with 3 blades to see the "three-blade" effect
- Toggle "Subtract Mean" to remove DC component
- Observe how sin²(θ) sums to a constant (B/2) while sin(θ) sums to zero

## 🤝 Contributing

This is an educational project. Feel free to fork, modify, and use for teaching or learning purposes.

## 📄 License

Open source for educational purposes.

## 🌟 Future Enhancements

Potential additions:
- Wake effects visualization
- Comparison with 2-blade and 1-blade turbines
- Real-world wind data integration
- Blade stress analysis
- Economic cost comparisons
- Array effects (wind farm layout)

---

**Made with ❤️ for renewable energy education**

