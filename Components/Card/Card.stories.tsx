import { Card, CardProps } from './Card';
import { Meta, Story } from '@storybook/react';
import React from 'react';

// This tells Storybook how to list your stories and provide information
export default {
  title: 'Atoms/Card',
  component: Card,
  argTypes: {
  variant: { control: 'select' }
  }
} as Meta;

// With named export we define component's story
export const Default: Story<CardProps> = (args) => <Card {...args} />;
// Define default arguments for the Default story
Default.args = {
  variant: 'elevation',
  classes: 'w-64 h-64'
};

// Second story
export const WithText: Story<CardProps> = (args) => (
  <Card {...args}>
    <div>
      <span>Story that shows Card component with text</span>
    </div>
  </Card>
);
// Define default arguments for the WithText component and inherit arguments from Default component
WithText.args = {
  ...Default.args,
  classes: 'w-64 h-64 text-xl'
};