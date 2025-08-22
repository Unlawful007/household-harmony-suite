import { ShoppingCart, ChefHat, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface MealPlan {
  id: string;
  day: string;
  meal: string;
  ingredients: string[];
}

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  addedBy: string;
}

const sampleMealPlan: MealPlan[] = [
  { id: "1", day: "Today", meal: "Pasta Carbonara", ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan"] },
  { id: "2", day: "Tomorrow", meal: "Grilled Salmon", ingredients: ["Salmon", "Asparagus", "Lemon", "Olive Oil"] }
];

const sampleGroceryList: GroceryItem[] = [
  { id: "1", name: "Milk", category: "Dairy", completed: false, addedBy: "AJ" },
  { id: "2", name: "Bread", category: "Bakery", completed: true, addedBy: "TJ" },
  { id: "3", name: "Apples", category: "Produce", completed: false, addedBy: "AJ" },
  { id: "4", name: "Pasta", category: "Pantry", completed: false, addedBy: "Meal Plan" },
  { id: "5", name: "Eggs", category: "Dairy", completed: false, addedBy: "Meal Plan" }
];

export const GroceryMealPlanner = () => {
  const [groceryItems, setGroceryItems] = useState(sampleGroceryList);
  const [showMealPlan, setShowMealPlan] = useState(false);

  const toggleGroceryItem = (id: string) => {
    setGroceryItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = groceryItems.filter(item => item.completed).length;
  const totalCount = groceryItems.length;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center text-high-contrast">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Grocery & Meals
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowMealPlan(!showMealPlan)}
        >
          <ChefHat className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-readable">Shopping Progress</span>
          <span className="text-primary font-semibold">{completedCount}/{totalCount}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {showMealPlan ? (
        /* Meal Plan View */
        <div className="space-y-3">
          <h4 className="font-medium text-high-contrast">This Week's Meals</h4>
          {sampleMealPlan.map((meal) => (
            <div key={meal.id} className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary font-medium">{meal.day}</span>
                <ChefHat className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="font-medium text-high-contrast mb-1">{meal.meal}</div>
              <div className="flex flex-wrap gap-1">
                {meal.ingredients.map((ingredient, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Plan Meal
          </Button>
        </div>
      ) : (
        /* Grocery List View */
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {groceryItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/30">
              <button
                onClick={() => toggleGroceryItem(item.id)}
                className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  item.completed 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground hover:border-primary'
                }`}
              >
                {item.completed && <Check className="w-3 h-3" />}
              </button>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium ${item.completed ? 'line-through text-muted-foreground' : 'text-high-contrast'}`}>
                  {item.name}
                </span>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.addedBy}</span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      )}
    </div>
  );
};