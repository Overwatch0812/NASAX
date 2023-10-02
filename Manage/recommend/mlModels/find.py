import pandas as pd

def find_project(data_file, input_user_id=None, input_user_domain=None):
    try:
        # Load the CSV data into a Pandas DataFrame
        df = pd.read_csv(data_file)

        # Check if the user_id is present in the User_ID column
        if input_user_id:
            user_id_matches = df[df['User_ID'] == input_user_id]
            if not user_id_matches.empty:
                last_user_id_match = user_id_matches.iloc[-1]
                project_id = last_user_id_match['Project_ID']
                project_name = df[df['Project_ID'] == project_id]['Project_Name'].values[0]
                return project_id, project_name

        # Check if the user_domain is present in the User_Domain column
        if input_user_domain:
            user_domain_matches = df[df['User_Domain'] == input_user_domain]
            if not user_domain_matches.empty:
                last_user_domain_match = user_domain_matches.iloc[-1]
                project_id = last_user_domain_match['Project_ID']
                project_name = df[df['Project_ID'] == project_id]['Project_Name'].values[0]
                return project_id, project_name

        return None, None

    except FileNotFoundError:
        print(f"Error: File '{data_file}' not found.")
        return None, None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None, None
