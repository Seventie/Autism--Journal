// services/memoryService.ts
import { Memory } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class MemoryService {
  async getAll(): Promise<Memory[]> {
    try {
      const response = await fetch(`${API_URL}/memories`);
      if (!response.ok) {
        throw new Error('Failed to fetch memories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching memories:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Memory | null> {
    try {
      const response = await fetch(`${API_URL}/memories/${id}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching memory:', error);
      return null;
    }
  }

  async save(memory: Memory): Promise<Memory> {
    try {
      const response = await fetch(`${API_URL}/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memory),
      });

      if (!response.ok) {
        throw new Error('Failed to save memory');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving memory:', error);
      throw error;
    }
  }

  async update(id: string, memory: Partial<Memory>): Promise<Memory> {
    try {
      const response = await fetch(`${API_URL}/memories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memory),
      });

      if (!response.ok) {
        throw new Error('Failed to update memory');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating memory:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/memories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete memory');
      }
    } catch (error) {
      console.error('Error deleting memory:', error);
      throw error;
    }
  }
}

export const memoryService = new MemoryService();