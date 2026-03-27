import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination } from '@track-my-life/ui/src/components/molecules/pagination/pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
      description: 'Current page number',
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page',
    },
    total: {
      control: 'number',
      description: 'Total number of items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TOTAL_ITEMS = 95;
const PAGE_SIZE = 10;
const INITIAL_PAGE = 1;

const InteractivePagination = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  return (
    <Pagination
      page={page}
      pageSize={PAGE_SIZE}
      total={TOTAL_ITEMS}
      onPageChange={setPage}
      previousLabel="Previous page"
      nextLabel="Next page"
      renderInfo={(currentPage, totalPages) => `Page ${currentPage} of ${totalPages}`}
    />
  );
};

export const Default: Story = {
  render: () => <InteractivePagination />,
};

export const FirstPage: Story = {
  args: {
    page: 1,
    pageSize: 10,
    total: 50,
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
    renderInfo: (currentPage: number, totalPages: number) => `Page ${currentPage} of ${totalPages}`,
  },
};

export const MiddlePage: Story = {
  args: {
    page: 3,
    pageSize: 10,
    total: 50,
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
    renderInfo: (currentPage: number, totalPages: number) => `Page ${currentPage} of ${totalPages}`,
  },
};

export const LastPage: Story = {
  args: {
    page: 5,
    pageSize: 10,
    total: 50,
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
    renderInfo: (currentPage: number, totalPages: number) => `Page ${currentPage} of ${totalPages}`,
  },
};

export const SinglePage: Story = {
  args: {
    page: 1,
    pageSize: 10,
    total: 5,
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
  },
};
