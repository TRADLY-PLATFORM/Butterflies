import React from 'react';

const OrdersFilter = () => {
    return (
		<div>
			<label class="flex justify-center items-center ">
				<span class="text-[#77869E]   text-sm sm:text-lg mr-4">
					Filter by :
				</span>
				<select
					class="
                    block
                      w-[150px] sm:w-[200px]
                    mt-1
                    rounded-lg
                    bg-white
                    border-transparent
                    focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50
                  "
				>
					<option>Delivered</option>
					<option>Cancel by customer</option>
					<option>Process</option>
					<option>Completed</option>
				</select>
			</label>
		</div>
    );
};

export default OrdersFilter;