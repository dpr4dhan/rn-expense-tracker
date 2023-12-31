import {StyleSheet, Text, View} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import Button from "../components/UI/Button";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpense({ navigation, route})
{
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [isEditing, navigation]);

    function deleteExpenseHandler()
    {
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler()
    {
        navigation.goBack();
    }

    function confirmHandler(expenseData)
    {
        if(isEditing){
            expenseCtx.updateExpense(editedExpenseId, expenseData);
        }else{
            expenseCtx.addExpense(expenseData);
        }

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />

            { isEditing && <View style={styles.deleteContainer}>
                                <IconButton name="trash" color={GlobalStyles.colors.error500} size={36}
                                             onPress={ deleteExpenseHandler }/>
                           </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       padding: 24,
       backgroundColor: GlobalStyles.colors.primary800
   },
    deleteContainer: {
       marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",

    },

});