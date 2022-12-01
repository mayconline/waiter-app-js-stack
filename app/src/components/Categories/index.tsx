import { FlatList } from 'react-native';
import { Text } from '../Text';
import { CategoryContainer, Icon } from './styles';
import { useState } from 'react';
import { Category } from '../../types/Category';

interface CategoriesProps {
  categories: Category[];
  onFilterProductByCategory: (categoryId: string) => Promise<void>;
}

export function Categories({
  categories,
  onFilterProductByCategory,
}: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    onFilterProductByCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
          </CategoryContainer>
        );
      }}
      contentContainerStyle={{ paddingRight: 24 }}
    />
  );
}
