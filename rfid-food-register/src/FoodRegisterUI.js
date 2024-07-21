import React, { useState } from 'react';
import { Utensils, Coffee, Apple, Milk } from 'lucide-react';

const FoodCategory = {
  MAIN_DISH: '主菜',
  SIDE_DISH: '副菜',
  STAPLE_FOOD: '主食',
  DAIRY: '乳製品',
  FRUIT: '果物',
};

const DailyRecommendation = {
  [FoodCategory.STAPLE_FOOD]: { min: 5, max: 7 },
  [FoodCategory.SIDE_DISH]: { min: 5, max: 6 },
  [FoodCategory.MAIN_DISH]: { min: 3, max: 5 },
  [FoodCategory.DAIRY]: { min: 2, max: 2 },
  [FoodCategory.FRUIT]: { min: 2, max: 2 },
};

const DAILY_CALORIE_GOAL = 2000;

const CategoryIcon = ({ category }) => {
  switch (category) {
    case FoodCategory.MAIN_DISH:
    case FoodCategory.SIDE_DISH:
      return <Utensils className="inline-block mr-2" size={18} />;
    case FoodCategory.STAPLE_FOOD:
      return <Coffee className="inline-block mr-2" size={18} />;
    case FoodCategory.FRUIT:
      return <Apple className="inline-block mr-2" size={18} />;
    case FoodCategory.DAIRY:
      return <Milk className="inline-block mr-2" size={18} />;
    default:
      return null;
  }
};

const FoodRegisterUI = () => {
  const [scannedItems, setScannedItems] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const scanItem = () => {
    // 実際のシステムではここでRFIDタグの読み取り処理を行います
    const mockItems = [
      { id: 1, name: 'ごはん', category: FoodCategory.STAPLE_FOOD, calories: 200 },
      { id: 2, name: '鶏の唐揚げ', category: FoodCategory.MAIN_DISH, calories: 350 },
      { id: 3, name: 'サラダ', category: FoodCategory.SIDE_DISH, calories: 50 },
      { id: 4, name: 'ヨーグルト', category: FoodCategory.DAIRY, calories: 100 },
      { id: 5, name: 'りんご', category: FoodCategory.FRUIT, calories: 80 },
    ];
    
    const newItem = mockItems[Math.floor(Math.random() * mockItems.length)];
    setScannedItems([...scannedItems, newItem]);
    setTotalCalories(totalCalories + newItem.calories);
  };

  const getCategoryCount = (category) => {
    return scannedItems.filter(item => item.category === category).length;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">食事情報レジシステム</h1>
      
      <button onClick={scanItem} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        RFIDタグをスキャン
      </button>
      
      <table className="w-full mb-4 bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">品名</th>
            <th className="p-2 text-left">カテゴリー</th>
            <th className="p-2 text-left">カロリー</th>
          </tr>
        </thead>
        <tbody>
          {scannedItems.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">
                <CategoryIcon category={item.category} />
                {item.category}
              </td>
              <td className="p-2">{item.calories} kcal</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">合計カロリー: {totalCalories} kcal</h3>
        <p className="text-sm text-gray-600">1日の目標: {DAILY_CALORIE_GOAL} kcal</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(FoodCategory).map(([key, category]) => (
          <div key={category} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium flex items-center justify-between">
              <span>
                <CategoryIcon category={category} />
                {category}
              </span>
              <span className="text-blue-600">
                {getCategoryCount(category)} / {DailyRecommendation[category].min}-{DailyRecommendation[category].max}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-2">1日の推奨摂取量</h4>
        <ul className="text-sm">
          <li>主食: 5~7品</li>
          <li>副菜: 5~6品</li>
          <li>主菜: 3~5品</li>
          <li>乳製品: 2品</li>
          <li>果物: 2品</li>
          <li>カロリー: 2000 kcal</li>
        </ul>
      </div>
    </div>
  );
};

export default FoodRegisterUI;