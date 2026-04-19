import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useLocalStorage('goals_data', []);
  const [stats, setStats] = useLocalStorage('user_stats', { 
    xp: 0, 
    streak: 0, 
    completedCount: 0 
  });

  const addGoal = (formData) => {
    const newGoal = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      type: formData.type || "daily",
      target: Number(formData.target),
      progress: 0,
      status: "active",
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || null,
      logs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setGoals([...goals, newGoal]);
  };

  const editGoal = (id, updatedData) => {
    setGoals(prevGoals => prevGoals.map(goal => 
      (goal.id === id || goal.id === Number(id)) 
        ? { ...goal, ...updatedData, updatedAt: new Date().toISOString() } 
        : goal
    ));
  };

  const updateProgress = (id) => {
    setGoals(prevGoals => prevGoals.map(goal => {
      if ((goal.id === id || goal.id === Number(id)) && goal.status === 'active' && goal.progress < goal.target) {
        const newProgress = goal.progress + 1;
        const isNowCompleted = newProgress >= goal.target;
        
        setStats(prev => ({
          ...prev,
          xp: prev.xp + 20,
          completedCount: isNowCompleted ? prev.completedCount + 1 : prev.completedCount,
          streak: prev.streak + 1 // افزایش زنجیره فعالیت
        }));

        const newLog = { date: new Date().toISOString(), amount: 1 };
        
        return { 
          ...goal, 
          progress: newProgress, 
          status: isNowCompleted ? 'completed' : 'active',
          logs: [...(goal.logs || []), newLog],
          updatedAt: new Date().toISOString()
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id && g.id !== Number(id)));
  };

  const toggleStatus = (id) => {
    setGoals(goals.map(g => {
      if (g.id === id || g.id === Number(id)) {
        return { 
          ...g, 
          status: g.status === 'active' ? 'paused' : 'active',
          updatedAt: new Date().toISOString()
        };
      }
      return g;
    }));
  };

  return (
    <GoalContext.Provider value={{ 
      goals, 
      stats, 
      addGoal, 
      editGoal,
      updateProgress, 
      deleteGoal, 
      toggleStatus 
    }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);