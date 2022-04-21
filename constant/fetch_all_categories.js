export const fetch_all_categories = (categories) => {
  var all_categories = [];
  // 1st step
  for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    all_categories.push({ name: element.name, id: element.id });

    // 2nd step
    if (element.sub_category?.length > 0) {
      for (let j = 0; j < element.sub_category.length; j++) {
        const elementB = element.sub_category[j];
        all_categories.push({
          name: `${elementB.hierarchy[0].name}  → ${elementB.hierarchy[1].name}`,
          id: elementB.id,
        });

        // 3rd step
        if (elementB.sub_category?.length > 0) {
          for (let k = 0; k < elementB.sub_category.length; k++) {
            const elementC = elementB.sub_category[k];
            all_categories.push({
              name: `${elementC.hierarchy[0].name}  → ${elementB.hierarchy[1].name} → ${elementC.hierarchy[2].name}`,
              id: elementC.id,
            });

            // 4th step
            if (elementC.sub_category?.length > 0) {
              for (let l = 0; l < elementC.sub_category.length; l++) {
                const elementD = elementC.sub_category[l];
                all_categories.push({
                  name: `${elementD.hierarchy[0].name} → ${elementD.hierarchy[1].name} → ${elementD.hierarchy[2].name}  → ${elementD.hierarchy[3].name}`,
                  id: elementD.id,
                });
              }
            }
          }
        }
      }
    }

    if (i + 1 === categories.length) {
      return all_categories;
    }
  }
};
