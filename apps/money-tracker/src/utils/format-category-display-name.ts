import type { CategoryInfoDto } from '@track-my-life/shared/src/api/generated/types.gen';

export const formatCategoryDisplayName = (category: CategoryInfoDto): string =>
  category.parentCategory ? `${category.parentCategory.name} / ${category.name}` : category.name;
